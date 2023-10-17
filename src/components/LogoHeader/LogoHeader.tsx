export type logoProps = {
  logo: string;
};
function LogoHeader({ logo }: logoProps) {
  return (
    <div className="flex justify-center mt-10">
      <img src={logo} alt="" />
    </div>
  );
}

export default LogoHeader;
