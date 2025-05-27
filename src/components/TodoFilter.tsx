import { FilterType } from '../types/todo';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todoCount: {
    total: number;
    active: number;
    completed: number;
  };
}

export const TodoFilter = ({ currentFilter, onFilterChange, todoCount }: TodoFilterProps) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="todo-filter">
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      <div className="todo-stats">
        <span className="stat">
          Total: {todoCount.total}
        </span>
        <span className="stat">
          Active: {todoCount.active}
        </span>
        <span className="stat">
          Completed: {todoCount.completed}
        </span>
      </div>
    </div>
  );
};