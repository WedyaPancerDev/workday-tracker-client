import type { ISVGProps } from '@/types/icon'

const Logo = ({ className, color, sx }: ISVGProps): JSX.Element => {
  return (
    <svg
      width="80"
      height="68"
      viewBox="0 0 80 68"
      className={className}
      style={sx}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.5363 67.5488H13.9881C6.26295 67.5488 0 61.2863 0 53.5607V43.0125C0 35.2874 6.26249 29.0244 13.9881 29.0244H38.5244V53.5607C38.5244 61.2863 32.2619 67.5488 24.5363 67.5488Z"
        fill={color ?? '#202226'}
      />
      <path
        d="M55.4618 0.916992H66.0099C73.7351 0.916992 79.998 7.17949 79.998 14.9051V25.4533C79.998 33.1784 73.7355 39.4414 66.0099 39.4414H41.4736V14.9051C41.4736 7.17949 47.7366 0.916992 55.4618 0.916992Z"
        fill={color ?? '#202226'}
      />
      <path
        d="M32.9593 27.0281C36.0327 27.0281 38.5242 24.5366 38.5242 21.4633C38.5242 18.3899 36.0327 15.8984 32.9593 15.8984C29.886 15.8984 27.3945 18.3899 27.3945 21.4633C27.3945 24.5366 29.886 27.0281 32.9593 27.0281Z"
        fill={color ?? '#202226'}
      />
    </svg>
  )
}

export default Logo
