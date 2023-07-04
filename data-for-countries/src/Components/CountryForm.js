const CountryForm = ({ serachValue, onChange }) => {
  return (
    <form>
      <label htmlFor="search-form">find countries</label>
      <input
        type="text"
        id="search-form"
        onChange={onChange}
        value={serachValue}
      />
    </form>
  );
};
export default CountryForm;
