const ORANGE = "#f7651c";

function Sketch({
  children,
  className = "",
  width = 32,
  height = 32,
  viewBox = "0 0 32 32",
  title,
}) {
  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

const doodleProps = {
  stroke: ORANGE,
  strokeWidth: 2.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
};

export function DoodleSpiral({ className = "", size = 36 }) {
  return (
    <Sketch className={className} width={size} height={size}>
      <path {...doodleProps} d="M16 16m-5 0a5 5 0 1 1 10 0a6.5 6.5 0 1 1 -13 0a8 8 0 1 1 16 0" />
      <path {...doodleProps} opacity="0.55" d="M16 16m-4.4 0a4.4 4.4 0 1 1 8.8 0a6 6 0 1 1 -12 0" transform="rotate(8 16 16)" />
    </Sketch>
  );
}

export function DoodleWavyUnderline({ className = "", width = 120, height = 14 }) {
  return (
    <Sketch className={className} width={width} height={height} viewBox="0 0 120 14">
      <path {...doodleProps} d="M4 8c4 -6 8 -6 12 0s8 6 12 0 8 -6 12 0 8 6 12 0 8 -6 12 0 8 6 12 0 8 -6 12 0" />
      <path {...doodleProps} opacity="0.5" transform="translate(0 1.6)" d="M10 9c4 -5 8 -5 12 0s8 5 12 0 8 -5 12 0 8 5 12 0" />
    </Sketch>
  );
}

export function DoodleWave({ className = "", width = 90, height = 18 }) {
  return (
    <Sketch className={className} width={width} height={height} viewBox="0 0 90 18">
      <path {...doodleProps} d="M3 12c7 -9 14 -9 20 -2s16 8 24 1 14 -7 22 -1M69 10c4 -3 6 -3 9 0" />
      <path {...doodleProps} opacity="0.5" transform="translate(0 1.4)" d="M6 13c7 -8 14 -8 19 -1s14 7 21 1 13 -6 19 -1" />
    </Sketch>
  );
}

export function DoodleHeart({ className = "", size = 34 }) {
  return (
    <Sketch className={className} width={size} height={size} viewBox="0 0 32 32">
      <path {...doodleProps} d="M16 26C9.5 21 5.5 16.6 5.5 12.4 5.5 9.3 7.9 7 10.9 7 12.8 7 14.8 8 16 9.9 17.2 8 19.2 7 21.1 7c3 0 5.4 2.3 5.4 5.4 0 4.2-4 8.6-10.5 13.6z" />
      <path {...doodleProps} opacity="0.5" transform="rotate(-6 16 16)" d="M16 25C10 20.5 6.4 16.4 6.4 12.6 6.4 9.8 8.6 7.8 11.3 7.8 13 7.8 14.8 8.7 16 10.2 17.2 8.7 19 7.8 20.7 7.8c2.7 0 4.9 2 4.9 4.8 0 3.8-3.6 7.9-9.6 12.4z" />
    </Sketch>
  );
}

export function DoodleCircle({ className = "", size = 40 }) {
  return (
    <Sketch className={className} width={size} height={size} viewBox="0 0 40 40">
      <ellipse {...doodleProps} cx="20" cy="21" rx="14.5" ry="15.5" />
      <ellipse {...doodleProps} opacity="0.5" cx="20.8" cy="20.6" rx="12.5" ry="13.5" transform="rotate(7 20 20)" />
    </Sketch>
  );
}

export function DoodleArrow({ className = "", size = 40 }) {
  return (
    <Sketch className={className} width={size} height={size} viewBox="0 0 40 40">
      <path {...doodleProps} d="M7 24c9 -12 18 -13 26 -8M31 6c-1 5 -3 7 -8 9" />
      <path {...doodleProps} d="M33 16l-9 0 3 -5" opacity="0.85" />
    </Sketch>
  );
}

export function DoodleScribble({ className = "", width = 44, height = 16 }) {
  return (
    <Sketch className={className} width={width} height={height} viewBox="0 0 44 16">
      <path {...doodleProps} d="M3 8c6 -6 12 -6 16 -2 4 4 10 4 14 1 3 -2 6 -3 8 -2" />
      <path {...doodleProps} opacity="0.5" transform="translate(0 2)" d="M5 9c6 -5 11 -5 15 -1 4 3 9 3 12 0" />
      <path {...doodleProps} strokeWidth="1.6" d="M2 12c8 2 30 2 38 -2" />
    </Sketch>
  );
}