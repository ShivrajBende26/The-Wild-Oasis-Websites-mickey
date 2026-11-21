import { getCountries } from "@/app/_lib/data-service";

// Let's imagine your colleague already built this component 😃

async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();
  const selectedCountry = countries.find(
    (country) => country.name === defaultCountry
  );

  return (
    <select
      name={name}
      id={id}
      defaultValue={
        selectedCountry
          ? `${selectedCountry.name}%${selectedCountry.flag}`
          : ""
      }
      required
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
