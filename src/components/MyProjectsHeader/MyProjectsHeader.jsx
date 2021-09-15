import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';

const useStyles = makeStyles(() => ({
   root: {
      minWidth: "350px",
      width: "66%",
      borderRadius: 20,
   },
      content: {
      padding: 24,
   },
}));


function MyProjectsHeader() {
   const styles = useN03TextInfoContentStyles();
   const shadowStyles = useLightTopShadowStyles();
   const cardStyles = useStyles();
   return (
      <center>
         <Card className={cx(cardStyles.root, shadowStyles.root)}>
            <CardContent className={cardStyles.content}>
               <TextInfoContent classes={styles} heading={'My Projects'} />
            </CardContent>
         </Card>
      </center>
   );
};


export default MyProjectsHeader;