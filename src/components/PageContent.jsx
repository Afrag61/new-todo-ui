import classes from './PageContent.module.css';

function PageContent({ title, children }) {
  return (
    <div className={classes.content} style={{backdropFilter: "blur(10px)", borderRadius: "4px", border: "1px solid red"}}>
      <h1 style={{color: "red"}}>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
