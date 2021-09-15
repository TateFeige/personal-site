import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';

const useStyles = makeStyles(() => ({
   root: {
      minWidth: "350px",
      width: "50%",
      borderRadius: 20,
   },
      content: {
      padding: 24,
   },
}));


function MyStack() {
   const styles = useN03TextInfoContentStyles();
   const shadowStyles = useLightTopShadowStyles();
   const cardStyles = useStyles();
   return (
      <center>
         <Card className={cx(cardStyles.root, shadowStyles.root)}>
            <CardContent className={cardStyles.content}>
            <TextInfoContent
               classes={styles}
               heading={'My Stack'}
            />
            <h5>Languages</h5>
            <Chip label="HTML" /><Chip label="CSS" /><Chip label="Vanilla JavaScript" /><Chip label="C#" /><Chip label="ASP.NET" /><Chip label="MVC" /><Chip label="PostgreSQL" /><Chip label="GraphQL" /><Chip label="JSON" /><Chip label="REST" /><Chip label="SASS" /><Chip label="SCSS" />
            <br /><br />
            <h5>Frameworks & Systems</h5>
            <Chip label="Express.js" /><Chip label="React" /><Chip label="Node.js" /><Chip label="jQuery" /><Chip label="Axios" /><Chip label="Ajax" /><Chip label="jQuery" /><Chip label="Redux" /><Chip label="Redux Hooks" /><Chip label="Redux Sagas" />
            <Chip label="Passport" /><Chip label="Jest Unit Testing" /><Chip label="Git" /><Chip label="GitHub" /><Chip label="Bootstrap" /><Chip label="MaterialUI" /><Chip label="AWS" /><Chip label="Heroku" />
            </CardContent>
      </Card>
      </center>
   );
};


export default MyStack