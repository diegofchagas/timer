import { HandPalm, Play } from "@phosphor-icons/react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartButton, TaskInput,StopButton } from "./styles";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe o nome da tarefa'),
  minutesAmount:zod.number().min(1).max(60)
})

// como estou utilizando o zod para validação não precisar criar uma interface para validar os tipos que estou recenbendo com a ajuda do zod eu posso inferir os dados , no caso essa inferencia vira minha iterface assim utilizando tudo que a biblioteca nós proporcionar para a validação dos dados.           
//"Sempre que utilizamos variaves javascript no typescript precisamos informa ao typescript o tipo da mesma para não haver erros de identificação de tipo de variável, por isso uso de typeof".
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle{
  id:string
  task:string
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date
  finishedDate?: Date
}

export const Home = () => {
  const [cycles, setCycles]= useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId]= useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const {register, handleSubmit,watch,reset} = useForm<NewCycleFormData>({
    resolver:zodResolver(newCycleFormValidationSchema),
    defaultValues:{
      task:'',
      minutesAmount:0
    }
  });
    const activeTaskId = cycles.find(task => task.id === activeCycleId)
    const totalSeconds = activeTaskId ? activeTaskId.minutesAmount * 60 : 0

  useEffect(()=>{
    let interval: number;

    if(activeTaskId){
      interval = setInterval(()=>{
       const secondsDifference = differenceInSeconds(new Date(), activeTaskId.startDate)

        if(secondsDifference >= totalSeconds){
          setCycles(state => state.map((cycle)=>{
            if(cycle.id === activeCycleId){
              return {...cycle, finishedDate: new Date()}
            } else {
              return cycle
            }
          })
        )
        setAmountSecondsPassed(totalSeconds)
        clearInterval(interval)
        } else{
          setAmountSecondsPassed(secondsDifference)
        }
      },1000)
    }

    return ()=>{
      clearInterval(interval)
    }
  },[activeCycleId, activeTaskId, totalSeconds])

  const handleCreateNewCicle=(data: NewCycleFormData)=>{
    const newCycle={
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    setCycles((state)=>[...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    //Esse reset restarta meus dados para o valor default dos inputs.
    reset();
  }


  const handleInterruptCycle = ()=> {
        setCycles(state => state.map((cycle)=>{
          if(cycle.id === activeCycleId){
            return {...cycle, interruptedDate: new Date()}
          } else {
            return cycle
          }
        })
          )
        setActiveCycleId(null)
  }
    

    
    const currentSeconds = activeTaskId ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = minutesAmount.toString().padStart(2 ,'0')
    const seconds = secondsAmount.toString().padStart(2 ,'0')

    const task = watch('task');
    const isSubmitDisabled = !task

    useEffect(()=>{
      if(activeTaskId){
        document.title = `${minutes} ${seconds}`
      }
    },[minutes,seconds,activeTaskId])

    console.log(cycles)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <TaskInput 
          id="task"
          list="task-suggestions"
          placeholder="Dê um nome para o seu projeto"
          disabled={!!activeTaskId}
          {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="projeto 1"/>
            <option value="projeto 2"/>
            <option value="projeto 3"/>
            <option value="projeto 4"/>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
          type="number" 
          id="minutesAmount" 
          placeholder="00"
          step={5}
          min={1}
          max={60}
          disabled={!!activeTaskId}
          {...register('minutesAmount', {valueAsNumber:true})}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>
        { activeTaskId ?
          <StopButton onClick={handleInterruptCycle} type='button'>
            <HandPalm size={24}/>
            Interromper
          </StopButton>
        : <StartButton disabled={isSubmitDisabled}  type="submit">
          <Play size={24} />
          Começar
        </StartButton>}
      </form>
    </HomeContainer>
  );
};
