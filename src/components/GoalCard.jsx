import { useState } from 'react';

const GoalCard = ({ goal, onDelete, onUpdate, onDeposit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [showDepositForm, setShowDepositForm] = useState(false);

  const progress = Math.min(Math.round((goal.savedAmount / goal.targetAmount) * 100), 100);
  const remaining = goal.targetAmount - goal.savedAmount;
  
  // Calculate days left
  const today = new Date();
  const deadline = new Date(goal.deadline);
  const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const isNearDeadline = daysLeft <= 30 && !isCompleted;
  const isOverdue = daysLeft < 0 && !isCompleted;

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (depositAmount && Number(depositAmount) > 0) {
      onDeposit(goal.id, Number(depositAmount));
      setDepositAmount('');
      setShowDepositForm(false);
    }
  };

  return (
    <div className={`goal-card ${isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue' : ''} ${isNearDeadline ? 'warning' : ''}`}>
      <h3>{goal.name}</h3>
      <div className="goal-details">
        <p>Category: {goal.category}</p>
        <p>Target: ${goal.targetAmount.toLocaleString()}</p>
        <p>Saved: ${goal.savedAmount.toLocaleString()}</p>
        <p>Remaining: ${remaining.toLocaleString()}</p>
        
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}>
            <span>{progress}%</span>
          </div>
        </div>
        
        <p className="deadline">
          {isCompleted ? (
            <span className="status completed">Completed!</span>
          ) : isOverdue ? (
            <span className="status overdue">Overdue!</span>
          ) : (
            <>
              <span className={isNearDeadline ? 'status warning' : ''}>
                {daysLeft} days left
              </span>
              <span> (Due: {new Date(goal.deadline).toLocaleDateString()})</span>
            </>
          )}
        </p>
      </div>

      <div className="goal-actions">
        {!showDepositForm ? (
          <>
            <button onClick={() => setShowDepositForm(true)} className="btn btn-deposit">
              Make Deposit
            </button>
            <button onClick={() => onUpdate(goal)} className="btn btn-edit">
              Edit
            </button>
            <button onClick={() => onDelete(goal.id)} className="btn btn-delete">
              Delete
            </button>
          </>
        ) : (
          <form onSubmit={handleDepositSubmit} className="deposit-form">
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Amount"
              min="1"
              required
            />
            <button type="submit" className="btn btn-confirm">
              Confirm
            </button>
            <button 
              type="button" 
              onClick={() => setShowDepositForm(false)}
              className="btn btn-cancel"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default GoalCard;