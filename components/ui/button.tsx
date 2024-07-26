import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 space-nowrap rounded-md text-sm font-normal transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-70',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/80',
        destructive:
          'border border-destructive bg-destructive/30 border-destructive/80 hover:bg-destructive/50 hover:border-destructive/80 text-white shadow-sm',
        outline:
          'border border-input bg-primary/30 border-primary/60 hover:bg-primary/50 hover:border-primary/80 text-white shadow-sm',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/50',
        ghost: 'text-primary hover:bg-primary/10 hover:text-primary/90',
        link: 'text-muted-foreground underline-offset-4 hover:text-white !p-0 !h-6',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: '',
      },
      active: {
        true: 'bg-secondary/70',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      active: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  active?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      icon,
      children,
      active,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    const iconClass = cn({
      'text-primary-foreground': variant === 'default',
      'text-destructive-600': variant === 'destructive',
      'text-primary': variant === 'outline' || variant === 'ghost',
      'text-white': variant === 'secondary',
    })

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, active, className }))}
        ref={ref}
        {...props}
      >
        {icon && <span className={iconClass}>{icon}</span>}
        {children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
