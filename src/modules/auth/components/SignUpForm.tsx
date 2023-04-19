import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IGenderParams, ILocationParams, ISignUpParams, ISignUpValidation } from '../../../models/auth';
import { GENDER } from '../../intl/constants';
import { validateSignUp,validSignUp } from '../utils';
import { useForm } from "react-hook-form";
import { validEmailRegex } from '../../../utils';

interface Props {
  onSignUp(values: ISignUpParams): void;
  loading: boolean;
  errorMessage: string;
  locations: Array<ILocationParams>;
  states: Array<ILocationParams>;
  onChangeRegion(idRegion: string): void;
}

const SignUpForm = (props: Props) => {
  const { onSignUp, loading, errorMessage, locations, states, onChangeRegion } = props;

  const [formValues, setFormValues] = React.useState<ISignUpParams>({
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
    gender: '',
    region: '',
    state: '',
  });
  const [validate, setValidate] = React.useState<ISignUpValidation>();
  


  const renderGender = () => {
    const arrGender: JSX.Element[] = [
      <option value={''} key={''}>
        {' '}
        -- select an option --{' '}
      </option>,
    ];
    GENDER.map((g: IGenderParams, index: number) => {
      arrGender.push(
        <option value={g.value} key={index}>
          {g.label}
        </option>,
      );
    });
    return arrGender;
  };

  const renderRegion = () => {
    const arrRegion: JSX.Element[] = [
      <option value={'0'} key={''}>
        {' '}
        -- select an option --{' '}
      </option>,
    ];
    locations.map((location: ILocationParams, index: number) => {
      arrRegion.push(
        <option value={location.id} key={index}>
          {location.name}
        </option>,
      );
    });
    return arrRegion;
  };
  
  const changRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    onChangeRegion(e.target.value);
    setFormValues({ ...formValues, region: e.target.value });
   
  };

  const renderState = () => {
    const arrState: JSX.Element[] = [
      <option value={''} key={''}>
        {' '}
        -- select an option --{' '}
      </option>,
    ];
    states.map((state: ILocationParams, index: number) => {
      arrState.push(
        <option value={state.id} key={index}>
          {state.name}
        </option>,
      );
    });
    return arrState;
  };

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ISignUpParams>();
  const onSubmit = (data: ISignUpParams) => { console.log(data);}
  const regionReg = register('region');
  

  return (
    <form
      autoComplete="off"
      style={{ maxWidth: '560px', width: '100%' }}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="row g-3 needs-validation"
    >
     

      <div className="col-md-12">
        <label htmlFor="inputEmail" className="form-label">
          <FormattedMessage id="email" />
        </label>
        <input
          type="text"
          className="form-control"
          id="inputEmail"
          {...register("email",{required: true,
            pattern: validEmailRegex })}
         
        />
        {errors.email?.type === "required"&& <p>không được bỏ trống</p>}
        {errors.email?.type === "pattern"&& <p>email không đúng</p>}

       
      </div>

      <div className="col-md-12">
        <label htmlFor="inputPassword" className="form-label">
          <FormattedMessage id="password" />
        </label>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          {...register("password",{required: true, minLength: 4})}
         
        />
        {errors.password?.type === "required"&& <p>không được bỏ trống</p>}
        {errors.password?.type === "minLength"&& (<p>Không đủ độ dài</p>)}
        
      
      </div>

      <div className="col-md-12">
        <label htmlFor="inputRepeatPassword" className="form-label">
          <FormattedMessage id="repeatPassword" />
        </label>
        <input
          type="password"
          className="form-control"
          id="inputRepeatPassword"
          {...register("repeatPassword",{required: true})}

          
        />
        {watch("repeatPassword") && watch("repeatPassword") !== watch("password") && (
          <p>Mật khẩu không trùng</p>)}
        {/* {watch("repeatPassword") && watch("repeatPassword")===watch("password") }<p>Mật khẩu không đúng</p>  */}
        {errors.repeatPassword?.type === "required"&& <p>không được bỏ trống</p>}
        
      
      </div>

      <div className="col-md-12">
        <label htmlFor="inputName" className="form-label">
          <FormattedMessage id="name" />
        </label>
        <input
          type="text"
          className="form-control"
          id="inputName"
          {...register("name",{required:true})}
         
        />
        {errors.name?.type === "required"&& <p>không được bỏ trống</p>}

       
      </div>

      <div className="col-md-12">
        <label htmlFor="selectGender" className="form-label">
          <FormattedMessage id="gender" />
        </label>
        <select
          className="form-control"
          id="selectGender"
          {...register("gender",{required:true})}
         
        >
          {renderGender()}
        </select>
        {errors.gender?.type === "required"&& <p>không được bỏ trống</p>}

       
      </div>

      <div className="col-md-12">
        <label htmlFor="selectRegion" className="form-label">
          <FormattedMessage id="region" />
        </label>
        <select
  className="form-control"
  id="selectRegion"
  {...regionReg}
  onChange={e => {
    regionReg.onChange(e);
    console.log(e);
    changRegion(e);
    console.log('change');
  }}
>
  {renderRegion()}
</select>
        {errors.region?.type === "required"&& <p>không được bỏ trống</p>}

      
      </div>
      
    
        <div className="col-md-12">
          <label htmlFor="selectState" className="form-label">
            <FormattedMessage id="state" />
          </label>
          <select 
            className="form-control"
            disabled={!watch("region")|| watch("region") === '0'} 
            id="state" 
            >
            {renderState()}
          </select>
          {errors.state?.type === "required"&& <p>không được bỏ trống</p>}

        </div>
      
  
      <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            đăng ký
          </button>

        </div>
      </div>

      
    </form>
  );
};

export default SignUpForm;


