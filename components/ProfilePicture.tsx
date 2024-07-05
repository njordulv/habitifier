import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ProfilePictureProps } from '@/interfaces'

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  name,
  image,
  ...props
}) => {
  return (
    <>
      <Avatar {...props}>
        {image && <AvatarImage src={image} alt={`${name}'s profile picture`} />}
        <AvatarFallback>{name ? name[0].toUpperCase() : 'U'}</AvatarFallback>
      </Avatar>
    </>
  )
}
