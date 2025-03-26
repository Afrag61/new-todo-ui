import { useFormStatus } from "react-dom";

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <button className="save" type="submit" disabled={pending}>
      Save
    </button>
  );
};

export default Submit;
