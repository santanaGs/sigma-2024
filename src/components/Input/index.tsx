import { DivS, Eye, Input, Password, User } from "./styles";

import user from "@/assets/user.svg";
import passwordIcon from "@/assets/password.svg";
import eye from "@/assets/eye.svg";

interface InputType {
  type: string;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  password: boolean;
}

const InputS: React.FC<InputType> = ({
  type,
  placeholder,
  onChange,
  password,
}: InputType) => {
  return (
    <DivS>
      {!password && <User src={user} alt="" />}
      {password && <Eye src={eye} alt="" />}
      {password && <Password src={passwordIcon} alt="" />}
      <Input
        required
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </DivS>
  );
};

export default InputS;
