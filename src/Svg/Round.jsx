import * as React from "react";
const Round = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={800}
    height={800}
    fill="#1e57ff"
    viewBox="0 0 330.008 330.008"
    {...props}
  >
    <path d="M315.008 300.004h-55.242c42.45-29.886 70.242-79.258 70.242-135.004C330.008 74.021 255.991.004 165.012.004 74.024.004 0 74.021 0 165c0 90.983 74.024 165.004 165.012 165.004h149.996c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15zM30 165C30 90.563 90.566 30.004 165.012 30.004c74.437 0 134.996 60.559 134.996 134.996 0 74.441-60.559 135.004-134.996 135.004C90.566 300.004 30 239.441 30 165z" />
    <circle cx={165.004} cy={225.004} r={30} />
    <circle cx={165.004} cy={105.004} r={30} />
    <circle cx={105.004} cy={165.004} r={30} />
    <circle cx={225.004} cy={165.004} r={30} />
  </svg>
);
export default Round;
