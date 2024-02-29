import { useFieldArray, useForm } from 'react-hook-form';
import styles from './AddType.module.css'
import { TrashIcon } from '@heroicons/react/24/solid';
import { GetAllOptionListWithOptions } from '../../hooks/AddItemAPI';
import { useEffect } from 'react';

type FormValues = {
  optionList: [{
    optionListName: string;
    options: {name: string, price: number}[]
  }]

}

export default function AddType() {
  const allOptionListWithOptions: 
  Array<{ optionListName: string, 
          options: Array<{
          name: string,
          price: number | null}>
        }> = GetAllOptionListWithOptions()

  const onDeleteOptionHandler = () => {
    
  }

  
  const form = useForm<FormValues>({
    defaultValues: {
      optionList: [{
        optionListName: '',
        options: Array({name: '', price: NaN})
      }]
    }
  })

  const { register, control, handleSubmit, formState, setValue } = form;
  const { errors } = formState

  const { fields } = useFieldArray({
    name: "optionList",
    control
  })

  useEffect(()=>{
      if (Array.isArray(allOptionListWithOptions)){
        console.log("allOptionListWithOptions", allOptionListWithOptions)
        for (let optionList of allOptionListWithOptions){
          for (let entry of optionList.options){
            if (entry.price === null){
              entry.price = 0
            }
          }
        }
        console.log("allOptionListWithOptions after turning null to 0", allOptionListWithOptions)
        let dataRender: Array<{ optionListName: string, 
          options: Array<{
          name: string,
          price: number}>
        }> = [...allOptionListWithOptions] as 
          Array<{ optionListName: string, 
          options: Array<{
            name: string,
            price: number}>
          }>
        setValue("optionList", dataRender as any)
      }
  }, [allOptionListWithOptions])

  return (
    <>
      <div className="flex">
        <div className={styles.content}>
          <div>
            <h1>XX類別</h1>
            <form>
              <div>
                <button className='block my-5 mx-auto pl-16'>+ 新增選項欄</button>
                {fields.map((field, index) => (
                  <div className='form-control' key={field.id}>
                    <div className='flex'>
                      <input
                        className='m-5'
                        value="" // this should be option list name default by fetch
                        type="checkbox"
                        {...register(`optionList`)}
                        />
                      <input
                        className='w-full'
                        value="" // this should be option list name default by fetch
                        type="text"
                        {...register(`optionList.0.optionListName`)}
                        />
                    </div>
                    <div className='flex mx-auto my-5 pl-16'>
                      <button onClick={onDeleteOptionHandler} className='self-center'><TrashIcon className='w-6 h-6'/></button>
                      <input
                          className='mx-4'
                          value="" // this should be option name default by fetch
                          type="text"
                          {...register(`optionList.0.options.0.name`)}
                          />
                      <input 
                          className='mx-4'
                          type="number"
                          {...register(`optionList.0.options.0.price`)}
                          />
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}
