import { useState, useEffect } from 'react';
import GoalCard from './GoalCard';
import GoalForm from './GoalForm';
import { fetchGoals, createGoal, updateGoal, deleteGoal, makeDeposit } from '../services/api';

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const data = await fetchGoals();
      setGoals(data);
      setError(null);
    } catch (err) {
      setError('Failed to load goals. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (goalData) => {
    try {
      const newGoal = await createGoal(goalData);
      setGoals(prev => [...prev, newGoal]);
      setShowAddForm(false);
    } catch (err) {
      setError('Failed to add goal. Please try again.');
      console.error(err);
    }
  };

  const handleUpdateGoal = async (goalData) => {
    try {
      const updatedGoal = await updateGoal(goalData.id, goalData);
      setGoals(prev => prev.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
      setEditingGoal(null);
    } catch (err) {
      setError('Failed to update goal. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await deleteGoal(id);
      setGoals(prev => prev.filter(goal => goal.id !== id));
    } catch (err) {
      setError('Failed to delete goal. Please try again.');
      console.error(err);
    }
  };

  const handleDeposit = async (id, amount) => {
    try {
      const updatedGoal = await makeDeposit(id, amount);
      setGoals(prev => prev.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
    } catch (err) {
      setError('Failed to make deposit. Please try again.');
      console.error(err);
    }
  };

  // Calculate overview statistics
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;

  return (
    <div className="dashboard">
      <h1>Financial Goals Dashboard</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="overview-section">
        <h2>Overview</h2>
        <div className="overview-stats">
          <div className="stat-card">
            <h3>Total Goals</h3>
            <p>{totalGoals}</p>
          </div>
          <div className="stat-card">
            <h3>Total Saved</h3>
            <p>${totalSaved.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>Completed Goals</h3>
            <p>{completedGoals}</p>
          </div>
        </div>
      </div>

      <div className="goals-section">
        <div className="section-header">
          <h2>Your Goals</h2>
          {!showAddForm && !editingGoal && (
            <button onClick={() => setShowAddForm(true)} className="btn btn-add">
              Add New Goal
            </button>
          )}
        </div>

        {showAddForm && (
          <div className="form-container">
            <h3>Add New Goal</h3>
            <GoalForm 
              onSubmit={handleAddGoal} 
              onCancel={() => setShowAddForm(false)}
            />
            <button 
              onClick={() => setShowAddForm(false)}
              className="btn btn-cancel"
            >
              Cancel
            </button>
          </div>
        )}

        {editingGoal && (
          <div className="form-container">
            <h3>Edit Goal</h3>
            <GoalForm 
              initialData={editingGoal} 
              onSubmit={handleUpdateGoal} 
            />
            <button 
              onClick={() => setEditingGoal(null)}
              className="btn btn-cancel"
            >
              Cancel
            </button>
          </div>
        )}

        {loading ? (
          <p>Loading goals...</p>
        ) : goals.length === 0 ? (
          <p>No goals yet. Add your first goal to get started!</p>
        ) : (
          <div className="goals-grid">
            {goals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onDelete={handleDeleteGoal}
                onUpdate={setEditingGoal}
                onDeposit={handleDeposit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;