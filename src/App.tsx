import { Form, Button } from 'react-bootstrap';
import pptxgen from "pptxgenjs";
import { Formik } from 'formik';

import './App.css';

import { IMAGE_PATHS } from "./enums.mjs";


const BKGD_LTGRAY = "F1F1F1";
const BKGD_BACKGROUND = "71CDD6";
const COLOR_BLACK = "000000";
const QUESTION_BOX_HEIGHT = 0.50;
const QUESTION_MATH_BOX_HEIGHT = 0.5;
const QUESTION_BOX_WIDTH = 5.5;
const QUESTION1_X  = 4.5;
const QUESTION1_Y  = 0.30
const SPACE_BOX    =  0.30
const QUESTION2_Y  = QUESTION1_Y + QUESTION_BOX_HEIGHT + SPACE_BOX; 
const QUESTION3_Y  = QUESTION2_Y + QUESTION_BOX_HEIGHT + SPACE_BOX;
const QUESTION4_Y  = QUESTION3_Y + QUESTION_BOX_HEIGHT + SPACE_BOX;
const QUESTION5_Y  = QUESTION4_Y + QUESTION_BOX_HEIGHT + SPACE_BOX;
const QUESTION6_Y  = QUESTION5_Y + QUESTION_BOX_HEIGHT + SPACE_BOX;

function App() {
  function getRandomNum(min: any , max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getRandomOperation() {
    var characters       = '+-';
    var charactersLength = characters.length;
      
    return characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  //generate simple math questions
  function getMathQuestion() {
    var resultArray = [];
    var resultMathQuestion = 0;
    let opetationType = getRandomOperation();
    let randomMath1 = getRandomNum(1, 99)
    let randomMath2 = getRandomNum(1, 99) 

    switch(opetationType) {
      case "+":
        resultMathQuestion = (randomMath1 + randomMath2);
      break;
      case "-":
        resultMathQuestion = (randomMath1 - randomMath2);
      break;
    }

    resultArray[0] = randomMath1+" "+opetationType+" "+randomMath2+" = ";
    resultArray[1] = Math.abs(resultMathQuestion);

    return resultArray;
  }

  function genQuestions(quantity: Number) {
    var sortQuestions = [];
    for (let i = 0; i < quantity; i++) {
      var mathQuestions = getMathQuestion()
      sortQuestions[i] = { 
        question: mathQuestions[0], 
        response: mathQuestions[1]
      };
    }
    return sortQuestions;
  }

  function generatePPT(values: any) {
    alert(JSON.stringify(values, null, 2));

    const questionsMath = genQuestions(6);

    let pptx = new pptxgen();

    pptx.author = 'Daniel Ideriba';
    pptx.company = 'Personal';
    pptx.revision = '1';
    pptx.subject = 'Soccer Game - Generator';
    pptx.title = 'Soccer Game';

    pptx.layout = "LAYOUT_WIDE";
    pptx.defineSlideMaster({
    title: "PLACEHOLDER_SLIDE",
    background: { color: "FFFFFF" },
    slideNumber: { x: 0.3, y: "95%" },
    });

    let slide = pptx.addSlide({ masterName: "PLACEHOLDER_SLIDE" });

    //Block 1
    slide.addShape(
      pptx.ShapeType.rect, { 
        x: 0.1, 
        y: 0.1, 
        w: 4.0, 
        h: 6.5, 
        fill: { color: BKGD_BACKGROUND }, 
        line: { 
          type: "solid",
          color: COLOR_BLACK
        } 
    });

    slide.addImage({ 
      data: IMAGE_PATHS.HEADER_IMG_MATH.path, 
      x: 1.0, 
      y: 0.2, 
      w: 2.0, 
      h: 1.0, 
      objectName: "headerImg"
    });

    //Add looping here
    var currentYPosition = 0;
    for (let i = 0; i < questionsMath.length; i++) {
      var positionY = 1.5
      
      if(currentYPosition === 0) {
        currentYPosition = positionY;
      } else {
        positionY = currentYPosition + QUESTION_BOX_HEIGHT + SPACE_BOX;
        currentYPosition = positionY;
      }

      var yPosition = Number(currentYPosition.toFixed(1));

      slide.addText(questionsMath[i].question as string, { 
        margin: 4, 
        fill: { color: BKGD_BACKGROUND },
        x: 0.5, 
        y: yPosition,
        w: 2.0,
        h: QUESTION_MATH_BOX_HEIGHT,  
        color: COLOR_BLACK, 
        fontFace: "Arial", 
        align: "center",
        fontSize: 26,
        breakLine: true
      });

      slide.addText(questionsMath[i].response as string, { 
        margin: 4, 
        fill: { color: BKGD_BACKGROUND },
        x: 2.5, 
        y: yPosition,
        w: 1.0,
        h: QUESTION_BOX_HEIGHT,  
        color: COLOR_BLACK, 
        fontFace: "Arial", 
        align: "center",
        fontSize: 26,
        breakLine: true
      });

      slide.addShape(
        pptx.ShapeType.rect, { 
          x: 2.5,
          y: yPosition, 
          w: 1.0, 
          h: QUESTION_BOX_HEIGHT, 
          fill: { color: BKGD_LTGRAY }, 
          line: { 
            type: "solid",
            color: COLOR_BLACK
          } 
      });
    }

    //Block 1

    slide.addText(values.q1, { 
      margin: 4, 
      fill: { color: BKGD_LTGRAY },
      x: QUESTION1_X, 
      y: QUESTION1_Y,
      w: QUESTION_BOX_WIDTH, 
      h: QUESTION_BOX_HEIGHT, 
      color: COLOR_BLACK, 
      fontFace: "Georgia", 
      fontSize: 21,
      breakLine: true
    });

    slide.addText(values.q2, { 
      margin: 4, 
      fill: { color: BKGD_LTGRAY }, 
      x: QUESTION1_X, 
      y: QUESTION2_Y,
      w: QUESTION_BOX_WIDTH, 
      h: QUESTION_BOX_HEIGHT,
      color: COLOR_BLACK, 
      fontFace: "Georgia", 
      fontSize: 21
    });

    slide.addText(values.q3, { 
      margin: 4, 
      fill: { color: BKGD_LTGRAY }, 
      x: QUESTION1_X, 
      y: QUESTION3_Y,
      w: QUESTION_BOX_WIDTH, 
      h: QUESTION_BOX_HEIGHT,
      color: COLOR_BLACK, 
      fontFace: "Georgia", 
      fontSize: 21
    });

    slide.addText(values.q4, { 
      margin: 4, 
      fill: { color: BKGD_LTGRAY }, 
      x: QUESTION1_X, 
      y: QUESTION4_Y,
      w: QUESTION_BOX_WIDTH, 
      h: QUESTION_BOX_HEIGHT,
      color: COLOR_BLACK, 
      fontFace: "Georgia", 
      fontSize: 21
    });

    slide.addText(values.q5, { 
      margin: 4, 
      fill: { color: BKGD_LTGRAY }, 
      x: QUESTION1_X, 
      y: QUESTION5_Y,
      w: QUESTION_BOX_WIDTH, 
      h: QUESTION_BOX_HEIGHT,
      color: COLOR_BLACK, 
      fontFace: "Georgia", 
      fontSize: 21
    });

    slide.addText(values.q6, { 
      margin: 4, 
      fill: { color: BKGD_LTGRAY }, 
      x: QUESTION1_X, 
      y: QUESTION6_Y,
      w: QUESTION_BOX_WIDTH, 
      h: QUESTION_BOX_HEIGHT,
      color: COLOR_BLACK, 
      fontFace: "Georgia", 
      fontSize: 21,
      autoFit: true
    });

    slide.addText(values.name, {
			x: 10.2,
			y: 0.1,
			w: 3.0,
			h: 6.5,
			margin: 4,
			fill: { color: BKGD_LTGRAY },
			fontSize: 26,
			fontFace: "Georgia",
			color: COLOR_BLACK,
			valign: "bottom",
			align: "center",
		});

    slide.addImage({ 
      x: 10.5, 
      y: 0.2, 
      w: 2.5, 
      h: 4.2, 
      path: values.urlImage, 
      objectName: "image player"
    });
  
        
    pptx.writeFile({ fileName: "soccer_game.pptx" });
  }

  return(
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2));
          generatePPT(values);

          setSubmitting(false);
        }, 400);
      }}
      validate={ 
        values => {}
      }
      initialValues={{
        name: "Nome do jogador",
        urlImage: "URL da imagem do jogador",
        q1: 'Pergunta 1',
        q2: 'Pergunta 2',
        q3: 'Pergunta 3',
        q4: 'Pergunta 4',
        q5: 'Pergunta 5',
        q6: 'Pergunta 6'
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        errors,
        values
      }) => (
    <div className="App">
      <header className="App-header">
        <div className="content">
          <h1>PPT GENERATOR</h1>
          <h4>Preencha a BIO do jogador</h4>
          <Form className="formQuestion" onSubmit={handleSubmit}>

            <Form.Group className="formGroup" controlId="form.name">
              <Form.Control 
                size="lg"
                type="type"
                name="name" 
                placeholder={values.name} 
                onChange={handleChange} 
                onBlur={handleBlur} 
              />
            </Form.Group>

            <Form.Group className="formGroup" controlId="form.urlImg">
              <Form.Control 
                size="lg"
                type="type"
                name="urlImage" 
                placeholder={values.urlImage} 
                onChange={handleChange} 
                onBlur={handleBlur} 
              />
            </Form.Group>

            <Form.Group className="formGroup" controlId="form.q1">
              <Form.Control 
                size="lg"
                type="type" 
                name="q1"
                placeholder={values.q1} 
                onChange={handleChange} 
                onBlur={handleBlur} 
              />
            </Form.Group>

            <Form.Group className="formGroup" controlId="form.q2">
              <Form.Control 
                size="lg"
                type="type" 
                name="q2"
                placeholder={values.q2} 
                onChange={handleChange} 
                onBlur={handleBlur} 
              />
            </Form.Group>

            <Form.Group className="formGroup" controlId="form.q3">
              <Form.Control 
                size="lg"
                type="type" 
                name="q3"
                placeholder={values.q3} 
                onChange={handleChange} 
                onBlur={handleBlur} 
              />
            </Form.Group>
              
            <Form.Group className="formGroup" controlId="form.q4">
              <Form.Control 
                size="lg"
                type="type" 
                name="q4"
                placeholder={values.q4} 
                onChange={handleChange} 
                onBlur={handleBlur} 
              />
            </Form.Group>
          
            <Form.Group className="formGroup" controlId="form.q5">
              <Form.Control 
                size="lg"
                type="type" 
                name="q5"
                placeholder={values.q5} 
                onChange={handleChange} 
                onBlur={handleBlur} 
              />
            </Form.Group>

            <Form.Group className="formGroup" controlId="form.q6">
              <Form.Control 
                size="lg"
                type="type" 
                name="q6"
                placeholder={values.q6} 
                onChange={handleChange} 
                onBlur={handleBlur} 
              />
            </Form.Group>

            <Button className="submitButton" type="submit">
              Gerar Arquivo
            </Button>
            </Form>
        </div>
      </header>
    </div>
    )}
    </Formik>
  );
}

export default App;
