import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { SocialLink, SocialProvider } from '@mui-treasury/components/socialLink';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
   root: {
      margin: 'auto',
      borderRadius: spacing(2), // 16px
      transition: '0.3s',
      boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
      position: 'relative',
      maxWidth: 500,
      marginLeft: 'auto',
      overflow: 'initial',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: spacing(2),
      [breakpoints.up('md')]: {
         flexDirection: 'row',
         paddingTop: spacing(2),
      },
   },
   media: {
      width: '88%',
      minWidth: '200px',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: spacing(-3),
      height: 0,
      paddingBottom: '48%',
      borderRadius: spacing(2),
      backgroundColor: '#fff',
      position: 'relative',
      [breakpoints.up('md')]: {
         width: '100%',
         marginLeft: spacing(-3),
         marginTop: 0,
         transform: 'translateX(-8px)',
      },
      '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      //backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
      borderRadius: spacing(2), // 16
      opacity: 0.5,
      },
   },
   content: {
      padding: 24,
   },
   cta: {
      marginTop: 24,
      textTransform: 'initial',
   },
}));

function AboutMe() {

   const styles = useStyles();
   const shadowStyles = useOverShadowStyles();
   return (
      <Card className={cx(styles.root, shadowStyles.root)}>
         <CardMedia className={styles.media} image={'https://i.imgur.com/IgJzveK.jpg'}/>
         <CardContent>
            <TextInfoContent
               useStyles={useN03TextInfoContentStyles}  
               heading={'About Me'}
               body={
                  `I am a fullstack
                  developer with a passion for
                  all things code. I love to
                  tackle any and all challenges,
                  testing their skills and
                  learning along the way.
                  Always ready for a project!`
               }
            />
            <center>
               <SocialProvider>
                  <SocialLink
                     brand="LinkedIn"
                     href="https://www.linkedin.com/in/tate-feige/"
                     target="_blank"
                  />
                  <SocialLink
                     brand="GithubCircle"
                     href="https://github.com/tatefeige"
                     target="_blank"
                  />
                  <SocialLink
                     brand="EnvelopeSquare"
                     href="mailto:tate@tatefeige.com"
                  />
               </SocialProvider>
            </center>
         </CardContent>
      </Card>
   );
};

export default AboutMe;