import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ProfilePictureProps } from '@/interfaces'

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  name,
  image,
  email,
  ...props
}) => {
  const fallbackInitial =
    name && name.length > 0
      ? name[0].toUpperCase()
      : email && email.length > 0
      ? email[0].toUpperCase()
      : 'U'

  return (
    <Avatar {...props}>
      {image && (
        <AvatarImage src={image} alt={`${name || email}'s profile picture`} />
      )}
      <AvatarFallback>{fallbackInitial}</AvatarFallback>
    </Avatar>
  )
}
