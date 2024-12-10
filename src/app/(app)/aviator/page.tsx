import { SignalComponent } from './signal'

export default function Aviator() {
  return (
    <div className="min-h-screen flex flex-col gap-12 overflow-x-hidden">
      <div className="">
        <SignalComponent />
      </div>
      <div className="h-full">
        <iframe
          className="h-[700px] w-full"
          // style="height: 600px; border-radius: 25px; box-shadow: 0 0 31px -4px black;  border-width: 1px;"
          src="https://go.aff.sortenabet.com/ofez1sl2?utm_campaign=appaviator"
        />
      </div>
    </div>
  )
}
