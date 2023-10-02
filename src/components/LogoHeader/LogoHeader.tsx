import ImgLogo from '../images/inicio-site.png'



  
  function LogoHeader() {
    return (
      <>
        <section>
            <div className="flex justify-center">
              <img src={ImgLogo} alt="" />
            </div>
          </section>
      </>
    );
  }
  
  export default LogoHeader;
  