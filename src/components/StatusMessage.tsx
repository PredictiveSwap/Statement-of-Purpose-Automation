'use client';

interface StatusMessageProps {
  text: string;
  type: 'info' | 'success' | 'error';
  visible: boolean;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ text, type, visible }) => {
  const alertClass = {
    info: 'alert-info',
    success: 'alert-success',
    error: 'alert-danger'
  }[type];

  if (!visible) return null;

  return (
    <div 
      id="status-message" 
      className={`alert ${alertClass} status-message`} 
      role="alert"
    >
      {text}
    </div>
  );
};

export default StatusMessage; 