import { useFormStatus } from "react-dom";

const Reset = () => {
    const {pending} = useFormStatus();

  return (
    <button className="reset" type="reset" disabled={pending}>
      Reset
    </button>
  );
};

export default Reset;
