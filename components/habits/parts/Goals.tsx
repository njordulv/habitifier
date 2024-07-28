interface Props {
  goal: number
  units: string
  color: string
}

export const Goals: React.FC<Props> = ({ goal, units, color }) => {
  return (
    <div className="flex text-sm">
      <span className={color}>0</span>
      <span className="color-dark">/{goal}</span>
      <div>&nbsp;{units}</div>
    </div>
  )
}
