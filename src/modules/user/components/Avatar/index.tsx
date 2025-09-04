import { forwardRef, type HTMLAttributes, useState } from 'react'
import { clsx } from 'clsx'
import { UserId } from '@/gql/generated/graphql'

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  userId: UserId
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, userId, ...props }, ref) => {
    const [hasError, setHasError] = useState(false)

    const avatarSrc = `/avatars/${userId}.jpg`
    
    const baseClasses = clsx(
      'w-6 h-6 inline-flex items-center justify-center rounded-full overflow-hidden bg-gray-200'
    )

    return (
      <div ref={ref} className={clsx(baseClasses, className)} {...props}>
        {!hasError ? (
          <img 
            src={avatarSrc} 
            alt={`${userId} avatar`}
            className="w-full h-full object-cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="text-gray-500 font-medium text-xs">
            {userId.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar
