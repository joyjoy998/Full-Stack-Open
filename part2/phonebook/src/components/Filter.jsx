const Filter = (props) => {
  const { filterWord, handleFilterChange } = props;
  return (
    <div>
      filter shown with
      <input value={filterWord} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
