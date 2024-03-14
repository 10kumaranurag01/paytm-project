import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="shadow h-20 flex  ">
      <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-4 mr-2 ml-2">
        <div className="flex flex-col justify-center h-full text-xl ">U</div>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col justify-center h-full ml-4">
          {user.firstName} {user.lastName}
        </div>
        <div className="flex justify-center h-14 mt-4 mr-2">
          <Button
            label={"Send Money"}
            onClick={() => {
              navigate({
                pathname: "/sendmoney",
                search: `?id=${user._id}&name=${user.firstName}~${user.lastName}`,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
