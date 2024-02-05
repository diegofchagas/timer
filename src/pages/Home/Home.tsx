import { Play } from "@phosphor-icons/react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartButton, TaskInput } from "./styles";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe o nome da tarefa'),
  minutesAmount:zod.number().min(5).max(60)
})

// como estou utilizando o zod para validação não precisar criar uma interface para validar os tipos que estou recenbendo com a ajuda do zod eu posso inferir os dados , no caso essa inferencia vira minha iterface assim utilizando tudo que a biblioteca nós proporcionar para a validação dos dados.           
//"Sempre que utilizamos variaves javascript no typescript precisamos informa ao typescript o tipo da mesma para não haver erros de identificação de tipo de variável, por isso uso de typeof".
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const Home = () => {
  const {register, handleSubmit,watch,reset} = useForm<NewCycleFormData>({
    resolver:zodResolver(newCycleFormValidationSchema),
    defaultValues:{
      task:'',
      minutesAmount:0
    }
  });

  const handleCreateNewCicle=(data: NewCycleFormData)=>{
    console.log(data)
    //Esse reset restarta meus dados para o valor default dos inputs.
    reset();
  }

  const task = watch('task');
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <TaskInput 
          id="task"
          list="task-suggestions"
          placeholder="Dê um nome para o seu projeto"
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
          min={5}
          max={60}
          {...register('minutesAmount', {valueAsNumber:true})}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartButton disabled={isSubmitDisabled}  type="submit">
          <Play size={24} />
          Começar
        </StartButton>
      </form>
    </HomeContainer>
  );
};
