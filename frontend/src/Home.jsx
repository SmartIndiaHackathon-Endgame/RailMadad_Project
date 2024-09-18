import {Helmet} from "react-helmet"
import HomePageMainSection1 from "./HomePage1"

export default function HomePage(){
    return(
        <>
        <Helmet>
            <title>Home Page</title>
            <meta
            name="de">
            </meta>

        </Helmet>
        <div className="w-full bg-light_green-50">
            <div className="gap-[50px] flex flex-col bg-_171313 py-2.5">
                {/* <Header/>
                <HomePageMainSection/> */}
            </div>
            <div className="z-[1] mt-[-2px] realtive bg-deep_orange-50">
                <div className="sm:gap-[92px] md:gap-[138px] gap-[184px] mb-[18px] flex flex-col">
                    <HomePageMainSection1/>
                    <footer className="py-[38px] flex items-end bg-color_grey-900 pl-24 pr-14 md:px-5 sm:p-5">

                    </footer>
                </div>
            </div>
        </div>
        </>
    )
}