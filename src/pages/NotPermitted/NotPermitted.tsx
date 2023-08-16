import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import path from "src/constants/path";

export default function NotPermitted() {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button
          type="primary"
          onClick={() => navigate(path.home)}
          className="bg-primary"
        >
          Back Home
        </Button>
      }
    />
  );
}
