import { Button, Col, Form, Input, Row, message } from "antd";
import { registerAccount } from "src/apis/auth.api";
import { Link, useNavigate } from "react-router-dom";
import path from "src/constants/path";
import { useState } from "react";
interface RegisterFormDataType {
  email: string;
  password: string;
  fullName: string;
  confirmPassword?: string;
  phone: number;
}
export default function Register() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const onFinish = async (values: RegisterFormDataType) => {
    let timeoutId;
    setIsLoading(true);
    try {
      const { fullName, password, phone, email } = values;
      await registerAccount({
        fullName,
        email,
        password,
        phone,
      });
      setIsLoading(false);
      form.resetFields();
      message.success("Đăng ký thành công");
      navigate(path.login);
    } catch (error) {
      timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      form.resetFields();
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[400px] bg-gray-100 rounded-lg">
        <div className="">
          <Row align={"middle"} justify={"center"} className="h-[450px]">
            <Col className="w-[228px]">
              <h2 className="text-2xl font-bold text-center">
                Đăng ký tài khoản
              </h2>
              <Form
                form={form}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item<RegisterFormDataType>
                  name="fullName"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                  className="my-5"
                >
                  <Input placeholder="Full name" />
                </Form.Item>
                <Form.Item<RegisterFormDataType>
                  name="email"
                  rules={[
                    { required: true, message: "Please input your Email!" },
                  ]}
                  className="my-5"
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item<RegisterFormDataType>
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  className="my-5"
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item<RegisterFormDataType>
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Re-entered password not match")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>
                <Form.Item<RegisterFormDataType>
                  name="phone"
                  rules={[
                    { required: true, message: "Please input your phone!" },
                    {
                      pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
                      message: "Invalid phone number",
                    },
                  ]}
                >
                  <Input placeholder="Phone" />
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    danger
                    className="w-full"
                    loading={isLoading}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <div className="flex justify-between">
                <span className="mr-2">Bạn đã có tài khoản?</span>
                <Link to={path.login}>Đăng nhập</Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
