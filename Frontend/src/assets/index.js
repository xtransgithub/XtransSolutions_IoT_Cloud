import { Cloudinary } from "@cloudinary/url-gen";
import {scale} from '@cloudinary/url-gen/actions/resize';

const cld = new Cloudinary({cloud:{cloudName: 'daf2hsxuj'}});
const cld1=new Cloudinary({cloud:{cloudName: 'dlny5cjwv'}});

//const nochannel = cld.image('nti5ullg8iobxoovbof2').format('auto').quality('auto:low').resize(scale());
const nochannel = cld1.image('copy_of_copy_of_no_channels_available_dd8u7n').format('auto').quality('auto:best').resize(scale().width(400).height(300));
const Cloudimg = cld.image('fjcwlvbl81h3m5tndmcy').format('auto').quality('auto:low').resize(scale());
const iotimg = cld.image('jgnfprqqs4p0uasdmfhp').format('auto').quality('auto:low').resize(scale());
const signin = cld.image('xnfvytfd3wxcaujqzhzq').format('auto').quality('auto:low').resize(scale());
//const nodata = cld.image('xwufsxjvtypzmzl4qypm').format('auto').quality('auto:low').resize(scale());
const nodata = cld1.image('no_data_channel_fn1fkh').format('auto').quality('auto:low').resize(scale());
const analytics = cld.image('pelaja4tm93sk8lhc1uk').format('auto').quality('auto:low').resize(scale());
const singup = cld.image('yqo5natwy0enj2ka3vyo').format('auto').quality('auto:low').resize(scale());
const prediction = cld.image('xmbeti9ei64cj0qq6wqk').format('auto').quality('auto:low').resize(scale());    
const background = cld.image('ezfyte7v3uiilhimdiol').format('auto').quality('auto:low').resize(scale());
const logo = cld.image('wkar4zorqdabcjqnga7z').format('auto').quality('auto:low').resize(scale());

const C1 = cld.image('C1').format('auto').quality('auto:low').resize(scale());
const C2 = cld.image('C2').format('auto').quality('auto:low').resize(scale());
const C3 = cld.image('C3').format('auto').quality('auto:low').resize(scale());
const C4 = cld.image('C4').format('auto').quality('auto:low').resize(scale());
const C5 = cld.image('C5').format('auto').quality('auto:low').resize(scale());
const C6 = cld.image('C6').format('auto').quality('auto:low').resize(scale());
const C7 = cld.image('C7').format('auto').quality('auto:low').resize(scale());

const channel1 = cld.image('channel1').format('auto').quality('auto:low').resize(scale());
const channel2 = cld.image('channel2').format('auto').quality('auto:low').resize(scale());
const channel3 = cld.image('channel3').format('auto').quality('auto:low').resize(scale());
const channel4 = cld.image('channel4').format('auto').quality('auto:low').resize(scale());
const home = cld.image('home').format('auto').quality('auto:low').resize(scale());
const channel_page = cld.image('channel_page').format('auto').quality('auto:low').resize(scale());

const pred_1 = cld.image('pred_1').format('auto').quality('auto:low').resize(scale());
const pred_2 = cld.image('pred_2').format('auto').quality('auto:low').resize(scale());
const pred_3 = cld.image('pred_3').format('auto').quality('auto:low').resize(scale());
const pred_4 = cld.image('pred_4').format('auto').quality('auto:low').resize(scale());
const pred_5 = cld.image('pred_5').format('auto').quality('auto:low').resize(scale());
const pred_6 = cld.image('pred_6').format('auto').quality('auto:low').resize(scale());
const pred_7 = cld.image('pred_7').format('auto').quality('auto:low').resize(scale());
const pred_8 = cld.image('pred_8').format('auto').quality('auto:low').resize(scale());

const Alert_1 = cld.image('Alert_1').format('auto').quality('auto:low').resize(scale());
const Alert_2 = cld.image('Alert_2').format('auto').quality('auto:low').resize(scale());
const Alert_3 = cld.image('Alert_3').format('auto').quality('auto:low').resize(scale());
const Alert_4 = cld.image('Alert_4').format('auto').quality('auto:low').resize(scale());
const Alert_5 = cld.image('Alert_5').format('auto').quality('auto:low').resize(scale());
const reminder1 = cld.image('reminder1').format('auto').quality('auto:low').resize(scale());

const analysis_1 = cld.image('analysis_1').format('auto').quality('auto:low').resize(scale());
const analysis_2 = cld.image('analysis_2').format('auto').quality('auto:low').resize(scale());
const analysis_8 = cld.image('analysis_3').format('auto').quality('auto:low').resize(scale());
const analysis_4 = cld.image('analysis_4').format('auto').quality('auto:low').resize(scale());
const analysis_5 = cld.image('analysis_5').format('auto').quality('auto:low').resize(scale());
const analysis_6 = cld.image('analysis_6').format('auto').quality('auto:low').resize(scale());
const analysis_7 = cld.image('analysis_7').format('auto').quality('auto:low').resize(scale());
const analysis_3 = cld.image('analysis_8').format('auto').quality('auto:low').resize(scale());
const analysis_9 = cld.image('analysis_9').format('auto').quality('auto:low').resize(scale());


const images = {
    nochannel, Cloudimg, iotimg, singup, signin, nodata, analytics, prediction, background, logo,
    C1,C2, C3, C4, C5, C6, C7,
    channel1, channel2, channel3, channel4, home, channel_page,
    pred_1, pred_2, pred_3, pred_4, pred_5, pred_6, pred_7, pred_8,
    Alert_1, Alert_2, Alert_3, Alert_4, Alert_5, reminder1,
    analysis_1, analysis_2, analysis_3, analysis_4, analysis_5, analysis_6, analysis_7, analysis_8, analysis_9
};

export default images;