interface Props {
  elements: string[]
  color: string
}

export const Days: React.FC<Props> = ({ elements, color }) => {
  if (elements.length === 7) {
    return (
      <span className={`${color} bg-dark px-2 py-1 rounded-lg capitalize`}>
        Everyday
      </span>
    )
  }
  return elements.map((day) => (
    <span
      key={day}
      className={`${color} bg-dark px-2 py-1 rounded-lg capitalize`}
    >
      {day}
    </span>
  ))
}
