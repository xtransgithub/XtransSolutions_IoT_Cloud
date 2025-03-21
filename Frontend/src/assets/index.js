import { Cloudinary } from "@cloudinary/url-gen";
import {scale} from '@cloudinary/url-gen/actions/resize';

const cld = new Cloudinary({cloud:{cloudName: 'daf2hsxuj'}});

const nochannel = cld.image('nti5ullg8iobxoovbof2').format('auto').quality('auto:low').resize(scale());
const Cloudimg = cld.image('fjcwlvbl81h3m5tndmcy').format('auto').quality('auto:low').resize(scale());
const iotimg = cld.image('jgnfprqqs4p0uasdmfhp').format('auto').quality('auto:low').resize(scale());
const signin = cld.image('xnfvytfd3wxcaujqzhzq').format('auto').quality('auto:low').resize(scale());
const nodata = cld.image('xwufsxjvtypzmzl4qypm').format('auto').quality('auto:low').resize(scale());
const analytics = cld.image('pelaja4tm93sk8lhc1uk').format('auto').quality('auto:low').resize(scale());
const singup = cld.image('yqo5natwy0enj2ka3vyo').format('auto').quality('auto:low').resize(scale());
const prediction = cld.image('xmbeti9ei64cj0qq6wqk').format('auto').quality('auto:low').resize(scale());    
const background = cld.image('ezfyte7v3uiilhimdiol').format('auto').quality('auto:low').resize(scale());
const logo = cld.image('wkar4zorqdabcjqnga7z').format('auto').quality('auto:low').resize(scale());

const images = {
    nochannel,
    Cloudimg,
    iotimg,
    singup,
    signin,
    nodata,
    analytics,
    prediction,
    background,
    logo
};

export default images;