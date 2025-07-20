import { useState, useEffect } from 'react';

const GoalForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    savedAmount: '0',
    category: '',
    deadline: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'targetAmount' || name === 'savedAmount' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        name: '',
        targetAmount: '',
        savedAmount: '0',
        category: '',
        deadline: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <div className="form-group">
        <label htmlFor="name">Goal Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="targetAmount">Target Amount ($)</label>
        <input
          type="number"
          id="targetAmount"
          name="targetAmount"
          value={formData.targetAmount}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      {initialData && (
        <div className="form-group">
          <label htmlFor="savedAmount">Saved Amount ($)</label>
          <input
            type="number"
            id="savedAmount"
            name="savedAmount"
            value={formData.savedAmount}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="Savings">Savings</option>
          <option value="Investment">Investment</option>
          <option value="Travel">Travel</option>
          <option value="Education">Education</option>
          <option value="Home">Home</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="deadline">Deadline</label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {initialData ? 'Update Goal' : 'Add Goal'}
      </button>
    </form>
  );
};

export default GoalForm;