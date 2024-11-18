import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BaseButtonProps } from "antd/es/button/button";
import { IconLookup, IconName, IconPrefix } from "@fortawesome/free-solid-svg-icons";

type IconProp = IconName | [IconPrefix, IconName] | IconLookup;
type ButtonExtendedProps = BaseButtonProps & {
  textButon: string;
  buttonIcon: IconProp
  onClick: () => any
};

const ButtonComponent = ({
  type,
  iconPosition,
  textButon,
  buttonIcon,
  onClick
}: ButtonExtendedProps) => {
  return (
    <Button
      type={type}
      icon={<FontAwesomeIcon icon={buttonIcon} />}
      iconPosition={iconPosition}
      onClick={onClick}
    >
      {textButon}
    </Button>
  );
};

export default ButtonComponent;
