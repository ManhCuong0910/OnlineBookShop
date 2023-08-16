import { Button, Col, Form, Input, Row, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAccount } from "src/apis/auth.api";
import { doLoginAction } from "src/redux/account/accountSlice";
import path from "src/constants/path";
type FieldType = {
  username: string;
  password: string;
};
export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: FieldType) => {
    try {
      const delay = "1000";
      setIsLoading(true);
      const { username, password } = values;
      const res = await loginAccount({ username, password, delay });
      dispatch(doLoginAction(res.data.data.user));
      message.success("Đăng nhập thành công", 1);
      setIsLoading(true);
      form.resetFields();
      navigate(path.home);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      form.resetFields();
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full lg:w-[400px] bg-gray-100 rounded-lg">
        <div className="">
          <Row
            align={"middle"}
            justify={"center"}
            className="h-screen lg:h-[450px]"
          >
            <Col>
              <h2 className="text-2xl font-bold text-center">
                Đăng nhập tài khoản
              </h2>
              <Form
                form={form}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                  className="my-5"
                >
                  <Input placeholder="User name" />
                </Form.Item>
                <Form.Item<FieldType>
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  className="my-5"
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={isLoading}
                    htmlType="submit"
                    type="primary"
                    danger
                    className="w-full"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <div className="flex justify-between">
                <span>Bạn chưa có tài khoản ?</span>
                <Link to="/register">Đăng ký</Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
