import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacityProps, 
  ViewStyle, 
  TextStyle
} from 'react-native';
import Colors from '@/constants/Colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  fullWidth = false,
  style,
  textStyle,
  disabled,
  ...rest
}: ButtonProps) {
  const getButtonStyles = (): ViewStyle => {
    let buttonStyle: ViewStyle = {};
    
    // Variant styles
    switch (variant) {
      case 'primary':
        buttonStyle = styles.primaryButton;
        break;
      case 'secondary':
        buttonStyle = styles.secondaryButton;
        break;
      case 'outline':
        buttonStyle = styles.outlineButton;
        break;
      case 'text':
        buttonStyle = styles.textButton;
        break;
      case 'danger':
        buttonStyle = styles.dangerButton;
        break;
    }
    
    // Size styles
    switch (size) {
      case 'small':
        buttonStyle = { ...buttonStyle, ...styles.smallButton };
        break;
      case 'medium':
        buttonStyle = { ...buttonStyle, ...styles.mediumButton };
        break;
      case 'large':
        buttonStyle = { ...buttonStyle, ...styles.largeButton };
        break;
    }
    
    // Width style
    if (fullWidth) {
      buttonStyle = { ...buttonStyle, ...styles.fullWidthButton };
    }
    
    // Disabled style
    if (disabled || loading) {
      buttonStyle = { ...buttonStyle, ...styles.disabledButton };
    }
    
    return buttonStyle;
  };
  
  const getTextStyles = (): TextStyle => {
    let style: TextStyle = { ...styles.buttonText };
    
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        style = { ...style, ...styles.lightText };
        break;
      case 'outline':
      case 'text':
        style = { ...style, ...styles.darkText };
        break;
    }
    
    switch (size) {
      case 'small':
        style = { ...style, ...styles.smallText };
        break;
      case 'medium':
        style = { ...style, ...styles.mediumText };
        break;
      case 'large':
        style = { ...style, ...styles.largeText };
        break;
    }
    
    if (disabled || loading) {
      style = { ...style, ...styles.disabledText };
    }
    
    if (variant === 'outline') {
      style = { ...style, color: Colors.primary };
    }
    
    if (variant === 'secondary') {
      style = { ...style, color: Colors.textInverse };
    }
    
    return style;
  };
  
  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'text' ? Colors.primary : Colors.textInverse} 
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[getTextStyles(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Base button styles
  baseButton: {
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  
  // Variant styles
  primaryButton: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
    borderWidth: 0,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  dangerButton: {
    backgroundColor: Colors.error,
    borderWidth: 0,
  },
  
  // Size styles
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  
  // Width styles
  fullWidthButton: {
    width: '100%',
  },
  
  // State styles
  disabledButton: {
    opacity: 0.6,
  },
  
  // Text styles
  buttonText: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  lightText: {
    color: Colors.textInverse,
  },
  darkText: {
    color: Colors.textPrimary,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  disabledText: {
    opacity: 0.8,
  },
});