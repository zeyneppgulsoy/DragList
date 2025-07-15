import React from 'react';

const AddTaskForm: React.FC = () => {
  return (
    <form>
      <input type="text" placeholder="Yeni görev..." />
      <button type="submit">Ekle</button>
    </form>
  );
};

export default AddTaskForm; 