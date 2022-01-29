import { useEffect } from 'react';
import { useIsEmployee } from '../../../../currentUser';
export var useSetIsEmployeeBackgroundTask = function useSetIsEmployeeBackgroundTask(_ref) {
  var setIsEmployee = _ref.setIsEmployee;
  var isEmployee = useIsEmployee();
  useEffect(function () {
    setIsEmployee(isEmployee);
  }, [setIsEmployee, isEmployee]);
};