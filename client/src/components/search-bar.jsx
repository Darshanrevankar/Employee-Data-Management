import "./search-bar.css"

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="search">
      <label htmlFor="search" className="sr-only">

      </label>
      
      <input
        id="search"
        className="input"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
