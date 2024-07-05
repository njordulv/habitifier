import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ProfilePicture {
  name?: string | null
  image?: string | null
}

export default function ProfilePicture({ name, image }: ProfilePicture) {
  return (
    <>
      <Avatar>
        {image && <AvatarImage src={image} alt={`${name}'s profile picture`} />}
        <AvatarFallback>{name ? name[0].toUpperCase() : 'U'}</AvatarFallback>
      </Avatar>
    </>
  )
}
