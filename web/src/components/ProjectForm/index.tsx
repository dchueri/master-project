import { formatToBRL } from 'brazilian-values'
import Button from 'components/elements/Button'
import Date from 'components/elements/Datepicker'
import { useState } from 'react'
import InputMask from 'react-input-mask'
import Line from '../../public/line.svg'

const ProjectForm = () => {
  const [cep, setCep] = useState<string>()
  const [valor, setValor] = useState<number>(0)
  return (
    <div className="p-5">
      <div className="flex items-center">
        <h2 className="text-[22px] text-left uppercase font-bold leading-7 mr-2">
          Adicione um novo projeto
        </h2>
        <img src={Line} className="h-[3px]" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6">Título</label>
          <div className="mt-2">
            <input
              type="text"
              name="title"
              id="title"
              className="block p-3 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6">CEP</label>
          <div className="mt-2">
            <InputMask
              mask={'99999-999'}
              value={cep}
              onChange={(e) => {
                console.log(cep)
                return setCep(e.target.value)
              }}
              className="block p-3 appearance-none h-10 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6">Valor</label>
          <div className="mt-2">
            <input
              onChange={(e: any) => {
                const input = e.nativeEvent
                if (input.data) {
                  return setValor(parseInt(valor.toString() + input.data))
                }
                if (input.inputType == 'deleteContentBackward') {
                  const valueString = valor.toString()
                  const newValue = valueString.substring(
                    0,
                    valueString.length - 1
                  )
                  newValue ? setValor(parseInt(newValue)) : setValor(0)
                }
              }}
              value={formatToBRL((valor / 100).toString())}
              type="string"
              name="cost"
              id="cost"
              className="block p-3 appearance-none h-10 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium leading-6">
            Prazo final
          </label>
          <div className="mt-2 w-48">
            <Date />
          </div>
        </div>
        <div className="sm:col-span-3 flex justify-end">
          <Button className="button text">Adicionar</Button>
        </div>
      </div>
    </div>
  )
}

export default ProjectForm
