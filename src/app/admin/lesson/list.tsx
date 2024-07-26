import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from 'react-admin'

export const LessonList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <ReferenceField source="quizId" reference="quizzes" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  )
}
