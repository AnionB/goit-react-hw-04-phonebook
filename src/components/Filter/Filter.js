import PropTypes from 'prop-types';

export default function Filter({ filter }) {
  return (
    <>
      <p>Find contact by name</p>
      <input onChange={filter} type="text" name="filter" />
    </>
  );
}

Filter.propTypes = {
  filter: PropTypes.func.isRequired,
};
