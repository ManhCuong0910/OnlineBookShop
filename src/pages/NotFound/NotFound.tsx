import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import path from "src/constants/path";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
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
