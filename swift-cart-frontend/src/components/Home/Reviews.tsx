import user from "../../assets/images/user.jpg";

const Reviews = () => {
  return (
    <div className="my-10 w-[1320px] mx-auto flex gap-3">
      <div className="flex w-[432px] h-[242px] flex-col items-center justify-center gap-4 border-[1px] border-[#BABABA] rounded-lg">
        <div className="flex w-[432px] gap-10 ml-10 mt-3 justify-start items-center">
          <img
            className="rounded-full"
            src={user}
            width="86px"
            height="86px"
            alt=""
          />
          <h2 className="text-lg text-[#003F62] ">User Name</h2>
        </div>
        <p className="text-[#003F62] text-[13px] w-[395px] h-[82px] bg-[#E2F4FF] rounded-lg px-6 py-3 overflow-hidden">
          Lorem ipsum dolor sit amet consectetur. Nec sit enim tellus faucibus
          bibendum ullamcorper. Phasellus tristique aenean at lorem sed
          scelerisque.
        </p>
      </div>
      <div className="flex w-[432px] h-[242px] flex-col items-center justify-center gap-4 border-[1px] border-[#BABABA] rounded-lg">
        <div className="flex w-[432px] gap-10 ml-10 mt-3 justify-start items-center">
          <img
            className="rounded-full"
            src={user}
            width="86px"
            height="86px"
            alt=""
          />
          <h2 className="text-lg text-[#003F62] ">User Name</h2>
        </div>
        <p className="text-[#003F62] text-[13px] w-[395px] h-[82px] bg-[#E2F4FF] rounded-lg px-6 py-3 overflow-hidden">
          Lorem ipsum dolor sit amet consectetur. Nec sit enim tellus faucibus
          bibendum ullamcorper. Phasellus tristique aenean at lorem sed
          scelerisque.
        </p>
      </div>
      <div className="flex w-[432px] h-[242px] flex-col items-center justify-center gap-4 border-[1px] border-[#BABABA] rounded-lg">
        <div className="flex w-[432px] gap-10 ml-10 mt-3 justify-start items-center">
          <img
            className="rounded-full"
            src={user}
            width="86px"
            height="86px"
            alt=""
          />
          <h2 className="text-lg text-[#003F62] ">User Name</h2>
        </div>
        <p className="text-[#003F62] text-[13px] w-[395px] h-[82px] bg-[#E2F4FF] rounded-lg px-6 py-3 overflow-hidden">
          Lorem ipsum dolor sit amet consectetur. Nec sit enim tellus faucibus
          bibendum ullamcorper. Phasellus tristique aenean at lorem sed
          scelerisque.
        </p>
      </div>
    </div>
  );
};

export default Reviews;
