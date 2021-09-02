import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classnames from "classnames";
import './style.css';

export type ButtonSize = "lg" | "sm";

export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  className?: string;
  /**设置Button禁用 */
  disabled?: boolean;
  /**设置Button的大小 */
  size?: ButtonSize;
  /**设置Button的类型 */
  btnType?: ButtonType;
  children: React.ReactChild;
  href?: string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps> &
  Partial<AnchorButtonProps>;
/**
 * 这是第一个Button组件
 *
 *
 */
export const Button: FC<ButtonProps> = props => {
  const {
    btnType,
    disabled,
    size,
    children,
    className,
    href,
    ...restProps
  } = props;
  // const a = 2;
  // if (a == 2) {
  //   console.log(222);
  // }
  const classes = classnames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled
  });
  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  btnType: "default"
};

export default Button;
