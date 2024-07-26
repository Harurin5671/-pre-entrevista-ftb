// eslint-disable-next-line react/prop-types
export default function LabelInputStyled({ label, value, id, placeholder, type, onChange, name }) {
  return (
    <>
      <label htmlFor={type} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <input onChange={onChange} type={type} value={value} name={name} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={placeholder} required="" />
    </>
  )
}