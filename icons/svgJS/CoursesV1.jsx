import Svg, { Path } from "react-native-svg";

const CourseIcon = ({ strokeColor }) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M6.1 6.3C.1 9.7.2 9.9 8.3 14.1l3.8 2 4.9-2.8c2.8-1.5 4.9-3.2 4.7-3.7s-2.5-2.2-5.3-3.7l-4.9-2.7-5.4 3.1zM20.9 15c-.7 3.5-.4 4.8.7 3.8.3-.4.4-2.1.2-4l-.3-3.3-.6 3.5z" />
      <Path d="M5 15.4c0 1.8 3.8 4.6 6.3 4.6 2.8 0 7.7-2.9 7.7-4.5 0-1.9-.4-1.9-4 0-2.7 1.4-3.3 1.4-6 0-3.6-1.9-4-1.9-4-.1z" />

    </Svg>
  );
};

export default CourseIcon;