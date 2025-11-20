 const CardSkeleton = () => {
  return (
       <div className="h-[400px] bg-bg-dark rounded-xl flex flex-col items-center >">

      <div  className="w-[200px] h-[300px] bg-(--color-muted) rounded-xl " />

      <div className="w-full flex flex-col px-4">
        <div className="w-30 bg-(--color-muted) h-4"></div>

        <div className="w-full flex flex-col  ">

        <div className="w-20 bg-(--color-muted) h-2"></div>
        <div className="w-20 bg-(--color-muted) h-2"></div>

        </div>
      </div>
    </div>
  )
}

export default CardSkeleton